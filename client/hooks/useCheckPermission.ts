'use client';

import { selectAuth } from '@/redux/features/authSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { handleCheckPermissionRouter } from '@/utils/clientActions';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function useCheckPermission() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user: any = useAppSelector(selectAuth).user;

  useEffect(() => {
    async function checkPermission() {
      try {
        await handleCheckPermissionRouter(router, user.type, dispatch);
      } catch (error: any) {
        console.log(error.message);
      }
    }

    checkPermission();
  }, [user]);
}
