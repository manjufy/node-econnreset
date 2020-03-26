const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: '',
        user: '',
        password: '',
        database: '',
        //debug: true,
        pool: {
            min: 2,
            max: 10
        }
    }
});

console.log(new Date());

const Bluebird = require('bluebird');
function periodOfTime () {
  return Bluebird.delay(1000 * 60 * 15);
}

async function main () {
  try {
    await knex.raw('select 1');
    await periodOfTime();
    await knex.raw('select 1');
  } catch (e) {
    console.log(e);
  }
}

main().then(() => {
  console.log('Main ended with success');
});

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at:', p, 'reason:', reason);
});

process.on('uncaughtException', (err) => {
  console.log('Unhandled Exception!', err);
});
