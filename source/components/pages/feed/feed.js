import {Pins} from '../../widget/pins/pins.js';

export const Feed = () => {
  const template = Handlebars.templates.feed;
  const root = document.getElementById('root');
  root.innerHTML = template({});

  const pins = [
    {'content_url': 'https://i.pinimg.com/564x/6b/da/e4/6bdae4bb4e844e4a1f6ac5240070b55e.jpg'},
    {'content_url': 'https://i.pinimg.com/564x/57/f9/4d/57f94dc1ec9504ac0025e0b74916db46.jpg'},
    {'content_url': 'https://i.pinimg.com/564x/d5/54/d8/d554d8a15ba8af2eecff021d151a675a.jpg'},
    {'content_url': 'https://i.pinimg.com/564x/4d/73/3b/4d733bcd3e01ba2a865fda47a17bc799.jpg'},
    {'content_url': 'https://i.pinimg.com/564x/c3/0a/48/c30a487ad45504eb373ad44437763681.jpg'},
    {'content_url': 'https://i.pinimg.com/564x/b6/6e/0b/b66e0bac72d87471af8c13ab8a973e66.jpg'},
    {'content_url': 'https://i.pinimg.com/736x/2c/71/f2/2c71f267495a9c30ed14fb1a37e9989c.jpg'},
    {'content_url': 'https://i.pinimg.com/564x/fb/d2/6a/fbd26a8205ea35737c79537102222ba4.jpg'},
    {'content_url': 'https://i.pinimg.com/564x/55/bf/18/55bf184596c7c1040b433a1724e2a268.jpg'},
    {'content_url': 'https://i.pinimg.com/564x/53/87/73/53877344073f0982343788bf3bc1ecec.jpg'},
    {'content_url': 'https://i.pinimg.com/564x/39/89/ac/3989acc727ad10a053b036fe17f56295.jpg'},
    {'content_url': 'https://i.pinimg.com/564x/fd/ef/6d/fdef6d7906008e7dc37b862987a5a317.jpg'},
    {'content_url': 'https://i.pinimg.com/564x/da/31/2e/da312e19d333dfb91f7d16228855b34c.jpg'},
    {'content_url': 'https://i.pinimg.com/564x/39/68/03/396803115388ef129243be78e1913054.jpg'},
    {'content_url': 'https://i.pinimg.com/564x/ec/58/da/ec58dada7ce06d282d6fc6b2fd0e4a26.jpg'},
    {'content_url': 'https://i.pinimg.com/564x/26/22/ad/2622ad2773675f4e887825ca9f5b6f3d.jpg'},
    {'content_url': 'https://i.pinimg.com/564x/d4/48/29/d44829d0454fba90c38bbd3de08fdbef.jpg'},
    {'content_url': 'https://i.pinimg.com/564x/ac/07/b3/ac07b3caddbb176e872b096ba8544442.jpg'},
    {'content_url': 'https://i.pinimg.com/564x/7a/c1/c1/7ac1c1851139a6fb29871f917ea8da8a.jpg'},
    {'content_url': 'https://i.pinimg.com/564x/27/98/29/279829c1531c5a48f1cac6549e2cb3a4.jpg'},
    {'content_url': 'https://i.pinimg.com/564x/84/f6/3a/84f63acdbf8742e5654628c68184945b.jpg'},
    {'content_url': 'https://i.pinimg.com/564x/68/e9/b4/68e9b4d5323fd8cb05cc3a7df29cec83.jpg'},
    {'content_url': 'https://i.pinimg.com/564x/0f/23/45/0f2345512cc59bbad1e15c9c2bff1a4b.jpg'},
    {'content_url': 'https://i.pinimg.com/564x/7e/79/35/7e7935e96f460de38b0b3b9ef0810cf5.jpg'},
    {'content_url': 'https://i.pinimg.com/564x/1e/b2/16/1eb216f7dd96288102e267a322d5a582.jpg'},
    {'content_url': 'https://a24998-1222.t.d-f.pw/api/v1/img/5.jpg'},
  ];

  Pins(pins);
};
