import React from 'react'
import { Affix } from 'antd'
import ProfileMenu from './ProfileMenu'
import styles from './style.module.scss'

class TopBar extends React.Component {
  render() {
    return (
      <Affix>
        <div className={styles.topbar}>
          <div className="ml-auto">
            <ProfileMenu />
          </div>
        </div>
      </Affix>
    )
  }
}

export default TopBar
