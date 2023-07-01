import { imageField } from './custom-fields/captioned-image';
import { portableTextField } from './custom-fields/portable-text-field';
import { simplePortableTextField } from './custom-fields/simple-portable-text-field';
import { postType } from './post-type';
import { socialMediaType } from './social-media-type';

export const schemaTypes = [
  // Custom fields
  imageField,
  portableTextField,
  simplePortableTextField,

  // Documents
  socialMediaType,
  postType,
];
