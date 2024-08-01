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

const OnlineVotingPower: React.FC<ComponentDefault> = () => {
  const { t } = useTranslation('home');
  const { state } = useOnlineVotingPower();

  const votingPowerPercent = state.totalVotingPower === 0
    ? numeral(0) : numeral((state.votingPower / state.totalVotingPower) * 100);

  const classes = useStyles(votingPowerPercent.format(0));

  return (
    <div className={classes.root} style={{ height: '100%' }}>
      <div style={{ padding: '25px', display: 'flex', height: '100%' }}>
        <div style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
          alignContent: 'space-around',
        }}
        >


          <div>
            <div>Follow us on:</div>
            <div style={{ display: 'flex', gap: '5px' }}>
              <img src={xsvg} />
              <img src={linkedin} />
              <img src={medium} />
              <img src={telegram} />
            </div>

          </div>
          <div>
            <img src={wwwsvg} /> Empe.io
          </div>
        </div>

        <div>

        </div>
      </div>

    </div>
  );
};

export default OnlineVotingPower;
