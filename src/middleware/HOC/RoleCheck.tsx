"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/middleware/Store/useAuthStore";
import { useGetNameUser } from "@/hooks/useGetName";

interface WithAuthAndRoleProps {
  allowedRoles: string[];
}

const withAuthAndRole = <P extends object>(
  Component: React.FC,
  { allowedRoles }: WithAuthAndRoleProps
): React.FC<P> => {
  const AuthAndRoleComponent: React.FC = (props) => {
    const { user, token } = useAuthStore();
    const router = useRouter();
    const { getUserDinas } = useGetNameUser();

    React.useEffect(() => {
      // Redirect jika user tidak terautentikasi
      if (!token) {
        router.push("/");
        return;
      }

      // Periksa role user
      const userRole = user ? getUserDinas(user.id_user) : null;
      if (!userRole || !allowedRoles.includes(userRole)) {
        router.push("/unauthorized");
      }
    }, [user, token, allowedRoles, router, getUserDinas]);

    // Tampilkan komponen jika token dan role valid
    const userRole = user ? getUserDinas(Number(user.id_user)) : null;
    if (!token || !user || (userRole && !allowedRoles.includes(userRole))) {
      return null; // Opsional: Tampilkan loader jika diinginkan
    }

    return <Component {...props} />;
  };

  return AuthAndRoleComponent;
};

export default withAuthAndRole;
