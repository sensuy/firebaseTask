import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, QueryFn } from '@angular/fire/firestore';

export abstract class Firestore<T> {

	protected collection: AngularFirestoreCollection<T>;

	constructor(protected db: AngularFirestore) {}

	protected setCollection(path: string, queryFn?: QueryFn): void {
		this.collection = path ? this.db.collection(path, queryFn) : null;
	}

	getAll(): Observable<T[]> {
		return this.collection.valueChanges();
	}

}
