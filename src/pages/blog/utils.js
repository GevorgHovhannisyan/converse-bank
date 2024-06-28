import { FormattedMessage } from 'react-intl';

export const getBlogTitle = ({ blogTags, category }) => {
  if (category) {
    const categoryFind = blogTags.find((tag) => tag.slug === category);
    if (categoryFind) {
      return categoryFind.title;
    } else {
      return <FormattedMessage id="Converse blog" />;
    }
  } else {
    return <FormattedMessage id="Converse blog" />;
  }
};
