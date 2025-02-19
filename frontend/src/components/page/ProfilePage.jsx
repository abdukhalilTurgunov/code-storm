import { Layout, Segmented } from "antd";
import { InfoCircleOutlined, SettingOutlined, ProductOutlined } from '@ant-design/icons';
import React,{ useState } from "react";
import ProfileInfo from "../Profile/ProfileInfo"
import ProfileSettings from "../Profile/ProfileSettings"
import ProfileProjects from "../Profile/ProfileProjects"

export default function ProfilePage({userData}) {
  const [profile, setProfile] = useState('info')
  
  return (
    <>
      <Layout.Content style={{padding: '50px 25px'}}>
        <Segmented
          style={{ background: "rgb(235, 236, 241)", padding: "5px" , marginBottom: '50px'}}
          size="large"
          block
          value={profile}
          options={[
            {
              label: (
                <p
                  style={{
                    padding: 3,
                  }}
                >
                  <InfoCircleOutlined style={{marginRight: 7}}/>Info
                </p>
              ),
              value: "info",
            },

            {
              label: (
                <p
                  style={{
                    padding: 3,
                  }}
                >
                  <SettingOutlined style={{marginRight: 7}}/>Settings
                </p>
              ),
              value: "settings",
            },
            {
              label: (
                <p
                  style={{
                    padding: 3,
                  }}
                >
                  <ProductOutlined style={{marginRight: 7}}/>Projects
                </p>
              ),
              value: "projects",
            },
          ]}
          onChange={(e)=> setProfile(e)}
        />
        
        {profile === 'info' && <ProfileInfo userData={userData}/>}
        {profile === 'settings' && <ProfileSettings/>}
        {profile === 'projects' && <ProfileProjects/>}
        
      </Layout.Content>
    </>
  );
}
