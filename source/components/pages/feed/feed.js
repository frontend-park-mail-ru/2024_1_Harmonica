import {Pins} from '../../widget/pins/pins.js';
import {API} from "../../../modules/API.js";

export const Feed = async () => {
  const template = Handlebars.templates.feed;
  const root = document.getElementById('root');
  root.innerHTML = template({});

  const api = new API();
  const pins = await api.feed();
  Pins(pins);
};
