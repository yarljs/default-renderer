import {Atomizer, test} from './atomRenderer';
import * as utility from './utility';

const defaultAtomizers = () => {
  Atomizer(utility.image)
  Atomizer(utility.video)
  Atomizer(utility.anchor)
}

export {
  Atomizer,
  test,
  defaultAtomizers
}
