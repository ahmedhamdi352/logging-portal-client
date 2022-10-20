import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout, LocaleProvider } from 'antd';
import socketIOClient from 'socket.io-client';
import { IntlProvider } from 'react-intl';
import { Debounce } from 'react-throttle';
import WindowResizeListener from 'react-window-size-listener';
import { ThemeProvider } from 'styled-components';
import authAction from '../../redux/auth/actions';
import doucmentAction from '../../redux/documents/actions'
import appActions from '../../redux/app/actions';
import Sidebar from '../Sidebar/Sidebar';
import Topbar from '../Topbar/Topbar';
import sockets from '../../sockets';
// import ThemeSwitcher from "../../containers/ThemeSwitcher";
import AppRouter from './AppRouter';
import SendNewOtpModal from '../Setting/sendOtpModal';
import { siteConfig } from '../../settings';
import AppLocale from '../../languageProvider';
import themes from '../../settings/themes';
import AppHolder from './commonStyle';
import './global.css';
import { ROOT_URL } from '../../redux/keys';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const { Content, Footer } = Layout;
const { logout } = authAction;
const { toggleAll } = appActions;
const { changeOtpStatus } = doucmentAction;
class App extends Component {
  // componentDidMount() {
  //   let socket = socketIOClient(ROOT_URL);
  //   sockets.initialize(socket);
  // }
  render() {
    const { url } = this.props.match;
    const { locale, selectedTheme, height } = this.props;
    const currentAppLocale = AppLocale[locale];
    const appHeight = window.innerHeight;

    return (
      <LocaleProvider locale={currentAppLocale.antd}>
        <IntlProvider locale={currentAppLocale.locale} messages={currentAppLocale.messages}>
          <ThemeProvider theme={themes[selectedTheme]}>
            <AppHolder>
              <Layout style={{ height: appHeight }}>
                <Debounce time="1000" handler="onResize">
                  <WindowResizeListener onResize={(windowSize) => this.props.toggleAll(windowSize.windowWidth, windowSize.windowHeight)} />
                </Debounce>
                <Topbar url={url} />
                <Layout style={{ flexDirection: 'row', overflowX: 'hidden' }}>
                  <Sidebar url={url} />

                  <Layout
                    className="isoContentMainLayout"
                    style={{
                      height: height,
                    }}
                  >
                    <Content
                      className="isomorphicContent"
                      style={{
                        padding: '70px 0 0',
                        flexShrink: '0',
                        background: '#f1f3f6',
                        position: 'relative',
                      }}
                    >
                      <AppRouter url={url} />
                    </Content>
                    <Footer
                      style={{
                        background: '#ffffff',
                        textAlign: 'center',
                        borderTop: '1px solid #ededed',
                      }}
                    >
                      {siteConfig.footerText}
                    </Footer>
                    <ToastContainer autoClose={4000} hideProgressBar={true} />
                    <SendNewOtpModal
                      visible={this.props.needNewOtp}
                      handleCancel={() => {
                        this.props.changeOtpStatus(!this.props.needNewOtp)
                      }} />
                  </Layout>
                </Layout>
                {/* <ThemeSwitcher /> */}
              </Layout>
            </AppHolder>
          </ThemeProvider>
        </IntlProvider>
      </LocaleProvider>
    );
  }
}

export default connect(
  (state) => ({
    auth: state.Auth,
    locale: state.LanguageSwitcher.language.locale,
    selectedTheme: state.ThemeSwitcher.changeThemes.themeName,
    height: state.App.height,
    needNewOtp: state.documents.needNewOtp
  }),
  { logout, toggleAll, changeOtpStatus }
)(App);
