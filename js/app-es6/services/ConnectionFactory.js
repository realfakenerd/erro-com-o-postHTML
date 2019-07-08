const stores = ['negociacoes'];
const version = 1;
const dbName = 'aluraframe';

let connection = null;
let close = null;

export class ConnectionFactory {

    constructor() {
        throw new Error('Não é possível criar instâncias de ConnectionFactory')
    }

    static getConnection() {

        return new Promise((resolve, reject) => {
            if (connection) {
                resolve(connection);
                return;
            }

            let openRequest = window.indexedDB.open(dbName, version);

            openRequest.onupgradeneeded = e => {
                ConnectionFactory._createStores(e.target.result);
                console.log('Upgrade DB...');

            }
            openRequest.onsuccess = e => {

                connection = e.target.result;
                close = connection.close.bind(connection);
                connection.close = () => {
                    throw new Error('Utilize ConnectionFactory.closeConnection() para fechar a conexão');
                }
                resolve(connection);

            }
            openRequest.onerror = e => {
                console.log(e.target.error);
                reject(e.target.error.name);
            }
        });
    }
    static _createStores(connection) {
        if (connection.objectStoreNames.contains(stores))
            connection.deleteObjectStore(stores);
        connection.createObjectStore(stores, { autoIncrement: true });
    }
    static closeConnection() {
        if (connection) {
            close();
            connection = null;
        }
        console.log('Conexão fechada');
    }
}