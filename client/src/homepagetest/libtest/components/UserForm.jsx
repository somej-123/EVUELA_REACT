import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import useUserStore from '../stores/userStore';
import * as lodash from 'lodash';

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required")
});

const UserForm = () => {
    //유저 정보 추가
  const addUser = useUserStore((state) => state.addUser);
//   입력 항목의 유효성 검사 실행
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });
// submit버튼 클릭 시 addUser 실행
  const onSubmit = (data) => {
    // uniqueId : 고유식별 ID - index값을 넣는거 같음
    addUser({ id: lodash.uniqueId(), ...data });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Name</label>
        <input {...register('name')} />
        <p>{errors.name?.message}</p>
      </div>
      <div>
        <label>Email</label>
        <input {...register('email')} />
        <p>{errors.email?.message}</p>
      </div>
      <button type="submit">Add User</button>
    </form>
  );
};

export default UserForm;
