import React from 'react';
import { Link } from 'react-router-dom';

const AuthTexts = ({isLogin , isLoading , isLoginLoading}) => {
    return (
        <div className='md:w-1/2 p-6 text-white flex flex-col items-center justify-center bg-cover bg-center bg-[url("../../../../authImg.png")]'>
            <div className='text-center p-3  w-full'>
                <h1 className="text-4xl font-bold">
                    {isLogin ? 'Welcome Back!' : 'Hello Friend!'}
                </h1>

                {isLogin ? (
                    <p className='text-lg mt-2'>
                        To keep connected with us, please login with your personal info.
                    </p>
                ) : (
                    <p className='text-lg mt-2'>
                        Enter your Details and start your journey with us.
                    </p>
                )}
            </div>
            {!isLoading || !isLoginLoading && (
                <React.Fragment>
                    {isLogin ? (
                        <Link to={'/'}>
                            <button className='bg-transparent border my-4 px-5 py-3 border-white text-white rounded mt-5 hover:bg-amber-500 hover:text-white'>
                                SIGN UP
                            </button>
                        </Link>
                    ) : (
                        <Link to={'/login'}>
                            <button className='bg-transparent border my-4 px-5 py-3 border-white text-white rounded mt-5 hover:bg-amber-500 hover:text-white'>
                                LOGIN
                            </button>
                        </Link>
                    )}
                </React.Fragment>
            )}
        </div>
    )
}

export default AuthTexts