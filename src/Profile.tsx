import React, {ChangeEvent, useEffect, useState} from 'react';
import debounce from 'lodash.debounce';

interface Props {
  onChange: (profile: string) => void;
}

const FN_CHECKLIST_LOCAL_STORAGE_KEY = 'fn-checklist::profile';

export const Profile = (props: Props) => {
  const [profile, setProfile] = useState<string>('');
  const { onChange } = props;

  useEffect(() => {
    const prevProfile = localStorage.getItem(FN_CHECKLIST_LOCAL_STORAGE_KEY);

    if (prevProfile) {
      setProfile(prevProfile);
      handleOnChange(prevProfile);
    }
  }, []);

  const handleProfileChange = (e: ChangeEvent<HTMLInputElement>) => {
    localStorage.setItem(FN_CHECKLIST_LOCAL_STORAGE_KEY, e.target.value);
    handleOnChange(e.target.value);
    setProfile(e.target.value);
  };

  const handleOnChange = debounce((profile: string) => {
    onChange(profile);
  }, 200);

  return (
    <div className={'input-wrapper'}>
      <input type={'text'} value={profile} onChange={handleProfileChange} />
      <label className={`role-label ${profile.length ? 'small' : ''}`}>Profile</label>
    </div>
  )
}