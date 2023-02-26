import { FaLock, FaUserPlus } from 'react-icons/fa';
import { Form, Link, useSearchParams, useActionData, useTransition as useNavigation } from '@remix-run/react';

function AuthForm() {
  const [searchParams] = useSearchParams();
  const authMode = searchParams.get('mode') || 'login';
  const navigation = useNavigation();

  const validationErrors = useActionData();

  const loginOptions = {
    'login': {
      submitBtnCaption: 'Login',
      toggleBtnCaption: 'Create a new user',
      toLink: '?mode=signup',
      icon: <FaLock/>
    },
    'signup': {
      submitBtnCaption: 'Create User',
      toggleBtnCaption: 'Login with existing user',
      toLink: '?mode=login',
      icon: <FaUserPlus/>
    }
  }

  const isSubmitting = navigation.state !== 'idle';

  return (
    <Form method="post" className="form" id="auth-form">
      <div className="icon-img">
        {loginOptions[authMode].icon}
      </div>
      <p>
        <label htmlFor="email">Email Address</label>
        <input type="email" id="email" name="email" required/>
      </p>
      <p>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" minLength={7} />
      </p>

      {validationErrors && <ul>
        {Object.values(validationErrors).map((error) => (
          <li key={error}>{error}</li>
        ))}
      </ul>}

      <div className="form-actions">
        <button disabled={isSubmitting}>{isSubmitting ? 'Authenticating...': loginOptions[authMode].submitBtnCaption}</button>
        <Link to={loginOptions[authMode].toLink}>{loginOptions[authMode].toggleBtnCaption}</Link>
      </div>
      
    </Form>
  );
}

export default AuthForm;
