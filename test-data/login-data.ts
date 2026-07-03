export interface InvalidLoginScenario {
  description: string;
  username: string;
  password: string;
  expectedError: string;
}

export const VALID_USER = {
  username: 'standard_user',
  password: 'secret_sauce',
} as const;

export const invalidLoginScenarios: InvalidLoginScenario[] = [
  {
    description: 'locked out user',
    username: 'locked_out_user',
    password: 'secret_sauce',
    expectedError: 'Epic sadface: Sorry, this user has been locked out.',
  },
  {
    description: 'wrong password',
    username: 'standard_user',
    password: 'wrong_password',
    expectedError:
      'Epic sadface: Username and password do not match any user in this service',
  },
  {
    description: 'empty username',
    username: '',
    password: 'secret_sauce',
    expectedError: 'Epic sadface: Username is required',
  },
  {
    description: 'empty password',
    username: 'standard_user',
    password: '',
    expectedError: 'Epic sadface: Password is required',
  },
];