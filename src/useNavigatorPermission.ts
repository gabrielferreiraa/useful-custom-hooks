import { useState, useEffect, useCallback } from 'react';

enum MediaTypes {
  camera = 'video',
  microphone = 'audio'
}

type IUseNavigatorPermission = keyof typeof MediaTypes;
const useNavigatorPermission = (name: IUseNavigatorPermission) => {
  const [status, setStatus] = useState<PermissionState | null>(null);  

  const requestAccess = useCallback(async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ [MediaTypes[name]]: true });
    } catch (err) {
      console.log(`[${name}] ->  ${err.message}`);
    }
  }, [name]);

  useEffect(() => {
    if (window?.navigator?.permissions) {
      window.navigator.permissions.query({ name }).then((permission) => {
        setStatus(permission.state);

        permission.addEventListener('change', () => setStatus(permission.state));
      });
    }

    return () => {
      setStatus(null);
    };
  }, [name]);

  return [status, requestAccess] as const;
};

export default useNavigatorPermission;
