import React from 'react';
import Trans from 'next-translate/Trans';

import { Typography } from '@material-ui/core';
import { Name } from '@components';
import { MsgCreateDidDocument } from '@models';
import {
  useProfileRecoil,
} from '@recoil/profiles';

const CreateDidDocument = (props: {
  message: MsgCreateDidDocument;
}) => {
  const { message } = props;

  const from = useProfileRecoil(message.sender);
  const fromMoniker = from ? from?.name : message.sender;
  console.log(message);
  return (
    <Typography>
      <Trans
        i18nKey="message_contents:txCreateDidDocumentContent"
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
          didDocumentId: message.didDocument.id,
        }}
      />
    </Typography>
  );
};

export default CreateDidDocument;
