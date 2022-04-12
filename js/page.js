import { toggleFilters } from './filters.js';
import { togglePostForm } from './post-form.js';

const togglePage = (status) => {
  togglePostForm(status);
  toggleFilters(status);
};

export { togglePage };
