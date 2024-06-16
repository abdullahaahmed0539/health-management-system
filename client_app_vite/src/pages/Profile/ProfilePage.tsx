import React, { useEffect, useMemo } from "react";
import ProfileForm from "./ProfileForm";
import { ProfileData, RawProfile, Tag } from "../../models/User";
import { useLocalStorage } from "@uidotdev/usehooks";

interface Props {}

const ProfilePage = (props: Props) => {
  const [profile, setProfile] = useLocalStorage<RawProfile[]>("PROFILE", [])
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", [])
  console.log(localStorage.key.toString())

  useEffect(() => {
    localStorage.setItem(localStorage.key.toString(), JSON.stringify(profile)), [profile, setProfile]
  })

  const profileWithTags = useMemo(() => {
    return profile.map(profile => {
      return {
        ...profile, tags: tags.filter(tag => profile.tagIds.includes(tag.id.toString()))
      }
    })
  }, [profile, tags])
  return <div className="mx-4">
    <ProfileForm onSubmit={function (data: ProfileData): void {
      throw new Error("Function not implemented.");
    } } />
  </div>;
};

export default ProfilePage;
