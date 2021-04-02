import React from 'react'
import { Layout } from 'antd'
import { withRouter } from 'react-router-dom'
import styles from './style.module.scss'

@withRouter
class LoginLayout extends React.PureComponent {
  state = {
    backgroundNumber: 1,
    // backgroundEnabled: false,
  }

  render() {
    const { children } = this.props
    const { backgroundNumber } = this.state

    return (
      <Layout>
        <Layout.Content>
          <div
            className={`${styles.layout} ${styles.light}`}
            style={{
              backgroundImage: `url('resources/images/${backgroundNumber}.jpeg')`,
            }}
          >
            <div className={styles.header}>
              <nav className={styles.navigation}>
                <ul className={styles.navigationItems} />
              </nav>
            </div>
            <div className={styles.content}>{children}</div>
            <div className={`${styles.footer} text-center`}>
              <p>&copy; 2021 Seenam. All rights reserved.</p>
            </div>
          </div>
        </Layout.Content>
      </Layout>
    )
  }
}

export default LoginLayout
