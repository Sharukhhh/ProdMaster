import React from 'react'
import AuthTexts from '../../components/auth-page-components/AuthTexts'
import InputField from '../../components/auth-page-components/InputField'
import { useAuthFormHook } from '../../custom hooks/authForm'
import { useNavigate } from 'react-router-dom'
import { useSignUpUserMutation } from '../../Redux/services/apiSlice'
import { validateAuthFormData } from '../../utils/verifyCred'
import { errorAlert, successAlert } from '../../utils/alerts'
import ProgressLoader from '../../components/loaders/ProgressLoader'

const CommonAuth = ({isLogin}) => {
    const {authFormData , handleDataChange} = useAuthFormHook();
    const [signUpUser , {isLoading }] = useSignUpUserMutation()
    const navigate = useNavigate();


    const handleSubmit = async(e) => {
        e.preventDefault();

        try {
            const result = validateAuthFormData(authFormData);
            if(!result) {
                errorAlert('Invalid Entry');
                return;
            }
            if(!isLogin) {
                const response = await signUpUser(authFormData).unwrap();
                successAlert(response.message);
                setTimeout(() => {
                    navigate('/login');
                }, 3000);
            }

        } catch (error) {
            if(error.data.error) {
                errorAlert(error.data.error)
            } else {
                errorAlert(error?.statusText || error?.error);
            }
        }
    }
    return (
        <>
            <div className={`flex flex-col min-h-screen md:flex-row ${isLogin ? 'md:flex-row-reverse' : ''}`}>
                <AuthTexts isLogin={isLogin} />
                <div className='md:w-1/2 flex items-center justify-center p-8 shadow-md  bg-neutral-100'>
                    <div className='w-full md:w-2/3'>
                        <h2 className='text-3xl text-amber-500 font-bold mb-8'>
                            {isLogin ? 'Sign in to your Account' : 'Create Account'}
                        </h2>
                        <form onSubmit={handleSubmit}>
                            {isLogin ? (
                                <>
                                    <InputField
                                    placeholder={'Email'}
                                    type={'email'}
                                    name={'email'}
                                    value={authFormData.email}
                                    onChange={handleDataChange}
                                    />
                                    <InputField
                                    placeholder={'Password'}
                                    type={'password'}
                                    name={'password'}
                                    value={authFormData.password}
                                    onChange={handleDataChange}
                                    />                                    
                                </>
                            ) : (
                                <>
                                    <InputField
                                    placeholder={'Full Name'}
                                    type={'text'}
                                    name={'name'}
                                    value={authFormData.name}
                                    onChange={handleDataChange}
                                    />                               
                                    <InputField
                                    placeholder={'Email'}
                                    type={'email'}
                                    name={'email'}
                                    value={authFormData.email}
                                    onChange={handleDataChange}
                                    />
                                    <InputField
                                    placeholder={'Password'}
                                    type={'password'}
                                    name={'password'}
                                    value={authFormData.password}
                                    onChange={handleDataChange}
                                    />                                                                   
                                </>
                            )}
                            <div className='flex justify-center'>
                                {isLoading ? (
                                    <ProgressLoader/>
                                ) : (
                                    <button type='submit' className='bg-indigo-900 mt-3 rounded-full items-center text-white px-10 py-4 
                                    text-lg font-bold hover:bg-amber-600'>
                                        {isLogin ? 'LOGIN' : 'CREATE ACCOUNT'}
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CommonAuth