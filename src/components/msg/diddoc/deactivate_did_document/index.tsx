import React from 'react';
import Trans from 'next-translate/Trans';

import { Typography } from '@material-ui/core';
import { Name } from '@components';
import { MsgDeactivateDidDocument } from '@models';
import {
  useProfileRecoil,
} from '@recoil/profiles';

const DeactivateDidDocument = (props: {
  message: MsgDeactivateDidDocument;
}) => {
  const { message } = props;

  const from = useProfileRecoil(message.sender);
  const fromMoniker = from ? from?.name : message.sender;

  return (
    <Typography>
      <Trans
        i18nKey="message_contents:txDeactivateDidDocumentContent"
        components={[
          (
            <Name
              address={message.sender}
              name={fromMoniker}
            />
          ),
          <b />,
        ]}
        values={{
          did: message.did,
          version: message.version,
          signature: message.signature,
        }}
      />
    </Typography>
  );
};

export default DeactivateDidDocument;
