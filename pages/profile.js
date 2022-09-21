import React, { useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { getError } from '../utils/error';
import axios from 'axios';
import Layout from '../components/Layout';
import Image from 'next/image';

export default function ProfileScreen() {
  const { data: session } = useSession();

  const {
    handleSubmit,
    register,
    getValues,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setValue('name', session.user.name);
    setValue('email', session.user.email);
  }, [session.user, setValue]);

  const submitHandler = async ({ name, email, password }) => {
    try {
      await axios.put('/api/auth/update', {
        name,
        email,
        password,
      });
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });
      toast.success('Profile updated successfully');
      if (result.error) {
        toast.error(result.error);
      }
    } catch (err) {
      toast.error(getError(err));
    }
  };

  return (
    <Layout title="Profile">
      <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(submitHandler)}
      >
        {/* ////////////////////////////////////////////////// */}
        <h1 className="text-xl pb-4">Update Profile</h1>
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="">
            <div className="pb-3 text-xl">
              <div className="bg-white">
                <div className="image overflow-hidden">
                  <Image
                    width="300"
                    height="300"
                    className="h-auto w-full mx-auto"
                    src="https://res.cloudinary.com/masterdevs/image/upload/v1657466465/avatars/60111_jb6zae.jpg"
                    alt="profile"
                  />
                </div>
                <h1 className="text-gray-900 font-bold text-xl leading-8 my-1 text-center">
                  {session.user.name}
                </h1>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto md:col-span-3">
            <div className="text-gray-700 p-1">
              <div className="mb-4">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="w-full"
                  id="name"
                  autoFocus
                  {...register('name', {
                    required: 'Please enter name',
                  })}
                />
                {errors.name && (
                  <div className="text-red-500">{errors.name.message}</div>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="w-full"
                  id="email"
                  {...register('email', {
                    required: 'Please enter email',
                    pattern: {
                      value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                      message: 'Please enter valid email',
                    },
                  })}
                />
                {errors.email && (
                  <div className="text-red-500">{errors.email.message}</div>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="password">Password</label>
                <input
                  className="w-full"
                  type="password"
                  id="password"
                  {...register('password', {
                    minLength: {
                      value: 6,
                      message: 'password is more than 5 chars',
                    },
                  })}
                />
                {errors.password && (
                  <div className="text-red-500 ">{errors.password.message}</div>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  className="w-full"
                  type="password"
                  id="confirmPassword"
                  {...register('confirmPassword', {
                    validate: (value) => value === getValues('password'),
                    minLength: {
                      value: 6,
                      message: 'confirm password is more than 5 chars',
                    },
                  })}
                />
                {errors.confirmPassword && (
                  <div className="text-red-500 ">
                    {errors.confirmPassword.message}
                  </div>
                )}
                {errors.confirmPassword &&
                  errors.confirmPassword.type === 'validate' && (
                    <div className="text-red-500 ">Password do not match</div>
                  )}
              </div>
              <div className="mb-4">
                <button className="primary-button">Update Profile</button>
              </div>
            </div>
          </div>
        </div>

        {/* //////////////////////////////// */}
      </form>
    </Layout>
  );
}

ProfileScreen.auth = true;
