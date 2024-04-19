import React from 'react';
import classnames from 'classnames';
import Trans from 'next-translate/Trans';
import { useRecoilValue } from 'recoil';
import useTranslation from 'next-translate/useTranslation';
import FooterLogoLight from '@assets/big-dipper-red.svg';
import FooterLogoDark from '@assets/big-dipper-white.svg';
import {
  Button,
  Divider,
  Typography,
} from '@material-ui/core';
import {
  chainConfig, generalConfig,
} from '@src/configs';
import { readTheme } from '@recoil/settings/selectors';
import { SocialMedia } from './components';
import {
  footerLinks, donateLink,
} from './utils';
import { useStyles } from './styles';

const Footer: React.FC<{className?: string}> = ({ className }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const theme = useRecoilValue(readTheme);

  // ============================
  // Footer
  // ============================
  const year = new Date().getFullYear();

  return (
    <div className={classnames(className, classes.root)}>
      <div className="footer__closing--container">
        <Typography className="footer__closing--text">
          {/* ============================= */}
          {/*
            WARNING: WE ARE USING APACHE 2.0 LICENSE
            DO YOUR RESEARCH BEFORE TRYING TO REMOVE/ EDIT THE FOLLOWING LINE(S)
            RESPECT OPEN SOURCE!!
          */}
          {/* ============================= */}
          <Trans
            i18nKey="common:copyright"
            components={[
              (
                // eslint-disable-next-line
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://raw.githubusercontent.com/forbole/big-dipper-2.0-cosmos/master/LICENSE"
                />
              ),
            ]}
            values={{
              name: generalConfig.maintainer.name,
            }}
          />
          {' '}
          {year}
        </Typography>
        <Typography className="footer__closing--text">
          <Trans
            i18nKey="common:maintainBy"
            components={[
              (
                // eslint-disable-next-line
                <a target="_blank" rel="noreferrer" href={generalConfig.maintainer.url} />
              ),
            ]}
            values={{
              name: generalConfig.maintainer.name,
            }}
          />
        </Typography>
      </div>
    </div>
  );
};

export default Footer;
