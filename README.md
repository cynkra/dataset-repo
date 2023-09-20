- Written in [BabelScript](https://babeljs.io/).
- [React](http://facebook.github.io/react/), [Flux](https://facebook.github.io/flux/), [react-router](https://github.com/rackt/react-router), [immutable.js](http://facebook.github.io/immutable-js/).
- Dev stack based on [gulp.js](http://gulpjs.com/) and [webpack](http://webpack.github.io/) configured both for dev and production.
- Server side rendering.
- CSS livereload and webpack module hot reload.

## Prerequisites

Install [iojs](https://iojs.org/) or [node.js](http://nodejs.org) (version 6.10.3 works, version 12 does not work anymore).
Then install [gulp.js](http://gulpjs.com/)
```shell
  npm install -g gulp
```

Some npm modules are required.
```shell
  npm install async
  npm install ladda
```
For dataset schema image generation, install [graphviz](http://www.graphviz.org/).

## Install

```shell
  git clone https://github.com/cynkra/dataset-repo.git
  cd dataset-repo
  npm install
```

## Configure

Update `src/config/config.server.js` with the correct credentials.

```shell
sudo apt install nginx
sudo rm -f /etc/nginx/sites-available/default /etc/nginx/sites-enabled/default
sudo cp etc/systemd/system/dataset.service /etc/systemd/system/
sudo cp etc/nginx/sites-available/dataset /etc/nginx/sites-available/dataset
sudo ln -s /etc/nginx/sites-available/dataset /etc/nginx/sites-enabled/dataset
```

## Run

- `gulp` start development
- `gulp -p` run app in production mode
- `gulp build -p` build in production mode
- `sudo systemctl start nginx`
- `sudo systemctl start dataset`


## Quality control
- Use [Broken Link Checker](http://www.brokenlinkcheck.com/) to validate that a user cannot accidentally kill the web.

## Upload datasets
- Create a new database on the server.
- Upload the data into the database. Make sure the tables are stored with InnoDB engine (not MyISAM, which doesn't support foreign key constrains). And if possible, prefer UTF-8 character set before latin1_swedish (the default value in old versions of MySQL).
- Add description of the data into meta.database and possibly into meta.dataset.
- Execute /assets/sql/meta_information.sql script to update meta.information.
- Validate the change on the webpage.

## Useful links for developers
- [React.js](http://facebook.github.io/react/).
- [What is the Flux application architecture](https://medium.com/brigade-engineering/what-is-the-flux-application-architecture-b57ebca85b9e).
- [Learn ES6](https://babeljs.io/docs/learn-es6/).
- [Immutable.js](http://facebook.github.io/immutable-js/) and [the case for immutability](https://github.com/facebook/immutable-js/#the-case-for-immutability).
- [Express.js](http://expressjs.com/)
- [Node.js](http://nodejs.org/api/)
- [Isomorphic javascript](http://isomorphic.net/javascript)

## Restore DB

Create a dump file

```bash
mysqldump -u guest -f -p -h relational.fit.cvut.cz --databases Accidents Ad AdventureWorks2014 Airline Atherosclerosis AustralianFootball Basketball_men Basketball_women Bench Bench2 Bench3 Bench4 Bench5 Bench6 Biodegradability Bupa CDESchools CORA Carcinogenesis ChEMBL Chess Chinook CiteSeer ConsumerExpenditures Countries CraftBeer Credit DCG Dallas Dunur Elti ErgastF1 FNHK Facebook Financial_ijs Financial_std FlexiBee GOSales Grants Hepatitis_std Hockey Hockey_Yeti IMDB_1R KRK Mesh Mondial Mondial_Tutorial Mondial_geo Mooney_Family MuskLarge MuskSmall NBA NCAA OpenML_2016 PTE Pima PremierLeague PubMed_Diabetes Pyrimidine SAP SAT SFScores SalesDB Same_gen Seznam Shakespeare Simpsons Student_loan TalkingData Telstra Toxicology Triazine TubePricing UTube UW_std VisualGenome Walmart Walmart_2014 WebKP Yelp YelpDataset3 YelpDataset3_disc_clean arnaud_DSSTOX arnaud_NWEcensusMid2014 arnaud_citeseer ccs classicmodels cs ctu_20news ctu_KDD_Cup_2009 ctu_adult ctu_auta ctu_crossSchema1 ctu_crossSchema2 ctu_datatype_benchmark ctu_deals ctu_ecoli ctu_fairytale ctu_feature_data ctu_feature_func ctu_feature_temp ctu_financial ctu_gaussian ctu_metalearning ctu_mushrooms ctu_outliers ctu_phishing ctu_titanic ctu_vondreli employee financial ftp geneea genes imdb_MovieLens imdb_full imdb_ijs imdb_small lahman_2014 legalActs medical meta mutagenesis mutagenesis_188 mutagenesis_42 nations nhl_draft northwind pubs restbase sakila stats stats_CEB tmp tpcc tpcd tpcds tpce tpch trains twitterfromsearch4_20101001 university voc world --single-transaction --quick --skip-lock-tables > relational.sql
```

Resotre it to RDS version 5.
Run the restore in a tmux session to avoid any network interruption.

```bash
sed -i 's/PAGE_CHECKSUM=0 ROW_FORMAT=PAGE TRANSACTIONAL=0//' relational.sql
sed -i 's/ROW_FORMAT=FIXED/ROW_FORMAT=COMPACT/g' relational.sql
mysql -u mysqldb -p -h hostname_of_the_DB < relational.sql
```

Create the guest user account.
```bash
CREATE USER 'guest'@'%' IDENTIFIED BY 'relational';
GRANT SELECT, PROCESS, LOCK TABLES ON *.* TO 'guest'@'%';
GRANT SELECT, LOCK TABLES ON `ctu_meta`.* TO 'guest'@'%';
GRANT SELECT, LOCK TABLES ON `ctu_qsar`.* TO 'guest'@'%';
GRANT SELECT, INSERT, DELETE, CREATE, DROP, INDEX, ALTER, LOCK TABLES, CREATE VIEW ON `predictor_factory`.* TO 'guest'@'%';
GRANT SELECT, LOCK TABLES ON `ctu_pf%`.* TO 'guest'@'%';
REVOKE SELECT ON mysql.* FROM 'guest'@'%' ;
FLUSH PRIVILEGES;
```
