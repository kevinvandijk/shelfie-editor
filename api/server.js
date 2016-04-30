import Koa from 'koa';
import KoaRouter from 'koa-router';
import serve from 'koa-static';
import mount from 'koa-mount';
import cors from 'koa-cors';
import convert from 'koa-convert';
import multer from 'koa-multer';
import bodyParser from 'koa-bodyparser';
import fs from 'fs';
import ffmpeg from 'fluent-ffmpeg';
import uuid from 'node-uuid';
import moment from 'moment';
import 'moment-duration-format';

const router = new KoaRouter();
const app = new Koa();
const upload = multer({ dest: './uploads/' });

router.post('/upload', upload.array('file'), ctx => {
  ctx.req.files.forEach(file => {
    const newName = `${file.destination}${file.originalname}`;
    fs.rename(file.path, newName);
  });

  ctx.status = 200;
});

router.get('/list', ctx => {
  ctx.body = fs.readdirSync('./uploads');
});

router.post('/cut', ctx => new Promise(resolve => {
  const body = ctx.request.body;
  const cutStart = body.cutStart;
  const startTime = moment.duration(cutStart, 'seconds').format('hh:mm:ss', { trim: false });
  const duration = moment.duration((body.cutEnd - cutStart) * 1000).asSeconds();
  const extension = body.file.split('.').pop();
  const name = `${uuid.v4()}.${extension}`;

  ffmpeg(`./uploads/${body.file}`)
    .setStartTime(startTime)
    .setDuration(duration)
    .output(`./uploads/${name}`)
    .on('end', () => {
      ctx.body = {
        output: `./uploads/${name}`,
      };

      resolve(ctx);
    })
    .run();
}));

const staticServer = serve('./uploads');

app
  .use(convert(bodyParser()))
  .use(convert(cors()))
  .use(router.routes())
  .use(router.allowedMethods())
  .use(convert(mount('/uploads', staticServer)))
  .listen(3000);
