import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import queryString from 'query-string';
import { Icon, Alert } from 'antd';
import SignInStyleWrapper from './signin.style';
import { InputField, Button } from '../../components/inputs';
//Auth actions
import authAction from '../../redux/auth/actions';
import TSN from '../../image/logo/barq.svg';

const { login } = authAction;

const SignIn = ({ history }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const dispatch = useDispatch();
  const { errorMessage } = useSelector(({ Auth }) => Auth);
  const isAuthenticated = useSelector((state) => state.Auth.isAuthenticated);
  const { user } = useSelector(({ Auth }) => Auth);


  useEffect(() => {
    setIsLoading(false);
    if (history.location.search) {
      const { redirect } = queryString.parse(history.location.search);
      if (isAuthenticated && !!redirect) history.push(redirect);
    }
    else if (isAuthenticated && user?.role === 'admin') history.push('/dashboard/add-allocation');
    else if (isAuthenticated && (user?.role === 'manger' || user?.role === 'employee')) history.push('/dashboard/logs/all');


    if (errorMessage) setErrorMsg(errorMessage);
  }, [isAuthenticated, errorMessage, history]);

  const { handleSubmit, control, errors } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: { username: '', password: '' },
  });

  const onSubmit = (values) => {
    setIsLoading(true);
    dispatch(login(values));
  };
  return (
    <SignInStyleWrapper className="isoSignInPage">
      <div className="isoLoginContentWrapper">
        <div className="isoLoginContent">
          <div className="isoLogoWrapper">
            <img src={TSN} style={{ height: '100px', marginTop: '-9px', width: 'auto', }} alt="Barq Logo" />
          </div>

          <div className="isoSignInForm">
            {errorMsg && <Alert style={{ fontWeight: 500 }} message={errorMsg} type="error" showIcon />}

            <form className="mt-2 mb-0" onSubmit={handleSubmit(onSubmit)}>
              <div className="row">
                <div className="form-group col-12">
                  <Controller
                    as={InputField}
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} control={control}
                    name="username"
                    size="large"
                    placeholder="Username"
                    errors={errors}
                    rules={{ required: 'Required Field' }}
                  />
                </div>
                <div className="form-group col-12">
                  <Controller
                    as={InputField}
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    control={control}
                    name="password"
                    size="large"
                    placeholder="Password"
                    type="password"
                    errors={errors}
                    rules={{ required: 'Required Field' }}
                  />
                </div>
                <div className="btn col">
                  <Button className='btn-login w-30' size="large" htmlType="submit"
                    style={{ backgroundColor: '#83712B', color: '#ffff', borderColor: '#83712B' }}
                  >
                    {!isLoading ? <p className='btn-text'>Login</p> : <Icon type="loading" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </SignInStyleWrapper>
  );
};

export default SignIn;
