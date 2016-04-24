import Koa from 'koa';
import KoaRouter from 'koa-router';
import serve from 'koa-static';
import mount from 'koa-mount';
import cors from 'koa-cors';
import convert from 'koa-convert';
import multer from 'koa-multer';
import fs from 'fs';

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

const staticServer = serve('./uploads');

app
  .use(convert(cors()))
  .use(router.routes())
  .use(router.allowedMethods())
  .use(convert(mount('/uploads', staticServer)))
  .listen(3000);
