jest.mock('../../clients/cognito');
jest.mock('uuid', () => ({
  v4: jest.fn(() => 'mock-uuid-1234'), // mock UUID
}));

import { signUp, confirmSignUp } from '../../services/auth/registration.services';
import { cognitoClient } from '../../clients/cognito';
import { APIError } from '../../config/error';
import { v4 as uuidv4 } from 'uuid';

describe('Auth Registration Services', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should throw an error if email already exists', async () => {
    // Mock ListUsersCommand response: email already exists
    (cognitoClient.send as jest.Mock).mockResolvedValueOnce({
      Users: [{ Username: 'existinguser' }]
    });

    await expect(
      signUp({ email: 'test@example.com', password: 'Password123!' })
    ).rejects.toThrow(APIError);

    expect(cognitoClient.send).toHaveBeenCalledTimes(1);
  });

  it('should successfully sign up a new user', async () => {
    // 1️⃣ Mock ListUsersCommand: no users found
    // 2️⃣ Mock SignUpCommand: user created
    (cognitoClient.send as jest.Mock)
      .mockResolvedValueOnce({ Users: [] })               // ListUsersCommand
      .mockResolvedValueOnce({ UserConfirmed: false });   // SignUpCommand

    const response = await signUp({ email: 'new@example.com', password: 'Password123!' });

    expect(response).toEqual({ UserConfirmed: false });
    expect(cognitoClient.send).toHaveBeenCalledTimes(2);

    // Verify that UUID generation was called
    expect(uuidv4).toHaveBeenCalled();
  });

  it('should confirm sign up successfully', async () => {
    // Mock ListUsersCommand: return the internal UUID
    (cognitoClient.send as jest.Mock)
      .mockResolvedValueOnce({ Users: [{ Username: 'mock-uuid-1234' }] }) // list users
      .mockResolvedValueOnce({}); // confirm sign-up

    const response = await confirmSignUp({ email: 'new@example.com', code: '123456' });

    expect(response).toEqual({});
    expect(cognitoClient.send).toHaveBeenCalledTimes(2);
  });

  it('should throw an error if email not found during confirm', async () => {
    (cognitoClient.send as jest.Mock).mockResolvedValueOnce({ Users: [] });

    await expect(confirmSignUp({ email: 'missing@example.com', code: '123456' }))
      .rejects.toThrow(APIError);

    expect(cognitoClient.send).toHaveBeenCalledTimes(1);
  });
});
