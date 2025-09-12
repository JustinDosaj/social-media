import { signUp, confirmSignUp } from '../../services/auth/registration.services';
import { cognitoClient } from '../../clients/cognito';
import { APIError } from '../../config/error';

describe('Auth Registration Services', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should throw an error if email already exists', async () => {
    // Mock ListUsersCommand response
    (cognitoClient.send as jest.Mock).mockResolvedValueOnce({
      Users: [{ Username: 'existinguser' }]
    });

    await expect(
      signUp({ email: 'test@example.com', username: 'testuser', password: 'Password123!' })
    ).rejects.toThrow(APIError);

    expect(cognitoClient.send).toHaveBeenCalledTimes(1);
  });

  it('should successfully sign up a new user', async () => {
    // Mock ListUsersCommand response (no users found)
    (cognitoClient.send as jest.Mock).mockResolvedValueOnce({ Users: [] });

    // Mock SignUpCommand response
    (cognitoClient.send as jest.Mock).mockResolvedValueOnce({ UserConfirmed: false });

    const response = await signUp({ email: 'user@example.com', username: 'user', password: 'password!' });
    expect(response).toEqual({ UserConfirmed: false });
    expect(cognitoClient.send).toHaveBeenCalledTimes(2);
  });

  it('should confirm sign up successfully', async () => {
    (cognitoClient.send as jest.Mock).mockResolvedValueOnce({});

    const response = await confirmSignUp({ username: 'newuser', code: '123456' });
    expect(response).toEqual({});
    expect(cognitoClient.send).toHaveBeenCalledTimes(1);
  });
});
