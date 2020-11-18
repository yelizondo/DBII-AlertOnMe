import { Logger } from "../common";
import { ArticleMSSQLController, ArticleMongoController } from "../database/articles";
import { IArticle, IMedia, IArticleMedia, IHashtag, ISubtitle } from "../database/articles";



export class ArticlesController {
    private static instance: ArticlesController;
    private log: Logger;

    private constructor() {
        this.log = new Logger();
    }

    // public insertLocation(pGUUID, pLatitud, pLongitud, pCanton) {

    // }

    public getArticles(pHashtags: string[]) : any {

        return Promise.all([
            ArticleMSSQLController.getInstance().getArticles(pHashtags),
            ArticleMongoController.getInstance().getArticles(pHashtags)
        ])
        .then((articles) => {
            const result = (articles[0] as object[]).concat((articles[1]) as object[]);
            return new Promise((resolve, reject) => {
                resolve(result as IArticle[]);
            });
        })
        .catch(error => {
            return new Promise((resolve, reject) => {
                reject(error);
            });
        });
    }

    public static getInstance() : ArticlesController {
        if (!this.instance) {
            this.instance = new ArticlesController();
        }
        return this.instance;
    }
}