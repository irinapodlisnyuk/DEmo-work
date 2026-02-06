import { regRules, loginRules } from '../validate/validationRules'; // укажи путь

describe('Validation Rules Config', () => {
  
  describe('regRules', () => {
    test('должен содержать правила для name, email и password', () => {
      expect(regRules).toHaveProperty('#name');
      expect(regRules).toHaveProperty('#email');
      expect(regRules).toHaveProperty('#password');
    });

    test('email regexp должен валидировать корректные адреса', () => {
      const emailRule = regRules['#email'].find(r => r.rule === 'customRegexp');
      const regex = emailRule?.value as RegExp;

      expect(regex.test('test@mail.com')).toBe(true);
      expect(regex.test('user.name@domain.co.uk')).toBe(true);
    });

    test('email regexp должен отклонять плохие адреса', () => {
      const emailRule = regRules['#email'].find(r => r.rule === 'customRegexp');
      const regex = emailRule?.value as RegExp;

      expect(regex.test('invalid-email')).toBe(false);
      expect(regex.test('test@short')).toBe(false);
    });
  });

  describe('loginRules', () => {
    test('должен требовать логин и пароль', () => {
      expect(loginRules['#login-username'][0].rule).toBe('required');
      expect(loginRules['#login-password'][0].rule).toBe('required');
    });
  });
});