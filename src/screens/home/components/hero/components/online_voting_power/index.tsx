import React from 'react';
import numeral from 'numeral';
import useTranslation from 'next-translate/useTranslation';
import { useStyles } from './styles';
import { useOnlineVotingPower } from './hooks';
import linkedin from '@assets/LinkedIn.svg?url';
import xsvg from '@assets/X.com.svg?url';
import medium from '@assets/Medium.svg?url';
import telegram from '@assets/Telegram.svg?url';
import wwwsvg from '@assets/world-wide-web 1.svg?url';
import stars from '@assets/stars.png';
import astronaut from '@assets/planets_and_astronaut.png';

const socials = [
  {
    img: xsvg,
    url: 'https://x.com/empe_io',
  },
  {
    img: linkedin,
    url: 'https://www.linkedin.com/company/empe-web3/',
  },
  {
    img: medium,
    url: 'https://medium.com/@Empeiria-web3',
  },
  {
    img: telegram,
    url: 'https://t.me/web3Empeiria',
  },
];

const OnlineVotingPower: React.FC<ComponentDefault> = () => {
  const { t } = useTranslation('home');
  const { state } = useOnlineVotingPower();

  const votingPowerPercent =
    state.totalVotingPower === 0
      ? numeral(0)
      : numeral((state.votingPower / state.totalVotingPower) * 100);

  const classes = useStyles(votingPowerPercent.format(0));

  return (
    <div
      className={classes.root}
      style={{
        backgroundImage: `url(${stars.src})`,
      }}
    >
      <div className={classes.infoSection}>
        <div style={{ display: 'flex', gap: 16, flexDirection: 'column' }}>
          <span className={classes.text}>{`${t('followUs')}:`}</span>
          <div className={classes.socials}>
            {socials.map((social, index) => (
              <a href={social.url} key={index} target="_blank">
                <img src={social.img} width={32} />
              </a>
            ))}
          </div>
        </div>
        <a
          href={'https://empe.io/'}
          target="_blank"
          className={classes.empeLink}
        >
          <img src={wwwsvg} width={32} />
          <span className={classes.text}>Empe.io</span>
        </a>
      </div>
      <div
        className={classes.imageSection}
        style={{
          backgroundImage: `url(${astronaut.src})`,
        }}
      />
    </div>
  );
};

export default OnlineVotingPower;
