import React, { useState } from 'react'
import { validate } from '../Validation/SignUpFormValidation';
import Layout from '../component/Layout';
import { ErrorMessage, FieldContainer, Form, FormContainer, FormHeading, FormInput, FormLabel, SubmitButton, FormSubtitle } from '../styles/form_style';
import { CommonContainer, Dropdown, PasswordEye } from '../styles/common_style';
import { apiPost } from '../ApiServices/apiServices';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Modal from '../component/Modal';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';
import LoaderComponent from '../component/LoaderComponent';

// ── Overlay loader styles (no extra CSS file needed) ──────────────────────────
// const overlayStyle = {
//   position: 'fixed',
//   inset: 0,
//   background: 'rgba(0, 0, 0, 0.45)',
//   display: 'flex',
//   flexDirection: 'column',
//   alignItems: 'center',
//   justifyContent: 'center',
//   zIndex: 9999,
// };

const SignUp = () => {
  const [error, setError] = useState({});
  const { partyId } = useSelector((state) => state.userReducer);
  const [showPassword, setShowPassword] = useState(true);
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const showPop = () => setShow(!show);
  const changeShow = () => setShowPassword(!showPassword);

  const [formData, setFormData] = useState({
    userName: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    roleTypeId: 'SPHINX_USER',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError({ ...error, [e.target.name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate(formData);
    setError(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setIsLoading(true); // show loader before API call
    // setTimeout(()=>{},2000);

    const response = await apiPost('/user/signup', { ...formData, partyId });

    setIsLoading(false); // hide loader after API call

    if (response.responseMessage === 'success') {
      setError(response);
      showPop();
    } else if (response.responseMessage === 'error') {
      toast.error('Signup failed', { position: 'top-center' });
      setError(response);
    }
  };

  return (
    <Layout>
      {/* ── Full-page overlay spinner ── */}
      {isLoading && <LoaderComponent text='Loading...' content='Sigining in'/>}

      <CommonContainer>
        <FormContainer>
          <FormHeading>Create account</FormHeading>
          <FormSubtitle>Register user/admin to the sphinx platform</FormSubtitle>

          <Form onSubmit={handleSubmit}>
            <FieldContainer>
              <FormLabel htmlFor="userName">User name</FormLabel>
              <FormInput
                type="text"
                name="userName"
                placeholder="Enter your user name"
                value={formData.userName}
                onChange={handleChange}
              />
              {error.userName && <ErrorMessage>{error.userName}</ErrorMessage>}
            </FieldContainer>

            <FieldContainer>
              <FormLabel htmlFor="firstName">First name</FormLabel>
              <FormInput
                type="text"
                name="firstName"
                placeholder="Enter your first name"
                value={formData.firstName}
                onChange={handleChange}
              />
              {error.firstName && <ErrorMessage>{error.firstName}</ErrorMessage>}
            </FieldContainer>

            <FieldContainer>
              <FormLabel htmlFor="lastName">Last name</FormLabel>
              <FormInput
                type="text"
                name="lastName"
                placeholder="Enter your last name"
                value={formData.lastName}
                onChange={handleChange}
              />
              {error.lastName && <ErrorMessage>{error.lastName}</ErrorMessage>}
            </FieldContainer>

            <FieldContainer>
              <FormLabel htmlFor="email">Email</FormLabel>
              <FormInput
                type="text"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />
              {error.email && <ErrorMessage>{error.email}</ErrorMessage>}
            </FieldContainer>

            {formData.roleTypeId === 'SPHINX_ADMIN' && (
              <FieldContainer>
                <FormLabel htmlFor="password">Password</FormLabel>
                <FormInput
                  type={showPassword ? 'password' : 'text'}
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                />
                {formData.password !== '' && (
                  <PasswordEye onClick={changeShow}>
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </PasswordEye>
                )}
                {error.password && <ErrorMessage>{error.password}</ErrorMessage>}
              </FieldContainer>
            )}

            <FieldContainer>
              <Dropdown name="roleTypeId" onChange={handleChange}>
                <option value="SPHINX_USER">User</option>
                <option value="SPHINX_ADMIN">Admin</option>
              </Dropdown>
            </FieldContainer>

            {/* ── Submit button with inline spinner ── */}
            <SubmitButton disabled={isLoading}>
              {isLoading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  />
                  Creating...
                </>
              ) : (
                'Create'
              )}
            </SubmitButton>
          </Form>
        </FormContainer>
      </CommonContainer>

      {show && (
        <Modal
          type="success"
          title={
            formData.roleTypeId === 'SPHINX_USER'
              ? 'User successfully created'
              : 'Admin successfully created'
          }
        />
      )}
    </Layout>
  );
};

export default SignUp;