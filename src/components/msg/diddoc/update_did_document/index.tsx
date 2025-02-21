import React from 'react';
import Trans from 'next-translate/Trans';

import { Typography } from '@material-ui/core';
import { Name } from '@components';
import { MsgUpdateDidDocument } from '@models';
import {
  useProfileRecoil,
} from '@recoil/profiles';

const UpdateDidDocument = (props: {
  message: MsgUpdateDidDocument;
}) => {
  const { message } = props;
  const from = useProfileRecoil(message.sender);
  const fromMoniker = from ? from?.name : message.sender;

  return (
    <Typography>
      <Trans
        i18nKey="message_contents:txUpdateDidDocumentContent"
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
          did: message.didDocumentUpdates.did_document.id,
          signature: JSON.stringify(message.signature),
        }}
      />
    </Typography>
  );
};

export default UpdateDidDocument;
