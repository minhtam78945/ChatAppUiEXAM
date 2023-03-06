import {
    getFirestore, getDoc, updateDoc, arrayUnion, arrayRemove, doc, setDoc, addDoc,
    onSnapshot, collection, query, where, orderBy, limit, serverTimestamp
}
    from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";
import { getAuth, onAuthStateChanged }
    from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";
export const addDocument = (collectionName, data) => {
    let db = getFirestore();
    (async () => {
        if (data.id)
            await setDoc(doc(db, collectionName, data.id), {
                ...data,
                createAt: serverTimestamp()
            })
        else {
            const newConversation = doc(collection(db, collectionName));
            await setDoc(newConversation, {
                ...data,
                createAt: serverTimestamp()
            });
        }
    })();
}
export const generateKeywords = (displayName) => {
    // liet ke tat cac hoan vi. vd: name = ["David", "Van", "Teo"]
    // => ["David", "Van", "Teo"], ["David", "Teo", "Van"], ["Teo", "David", "Van"],...
    const name = displayName.split(' ').filter((word) => word);

    const length = name.length;
    let flagArray = [];
    let result = [];
    let stringArray = [];

    /**
     * khoi tao mang flag false
     * dung de danh dau xem gia tri
     * tai vi tri nay da duoc su dung
     * hay chua
     **/
    for (let i = 0; i < length; i++) {
        flagArray[i] = false;
    }

    const createKeywords = (name) => {
        const arrName = [];
        let curName = '';
        name.split('').forEach((letter) => {
            curName += letter;
            arrName.push(curName);
        });
        return arrName;
    };

    function findPermutation(k) {
        for (let i = 0; i < length; i++) {
            if (!flagArray[i]) {
                flagArray[i] = true;
                result[k] = name[i];

                if (k === length - 1) {
                    stringArray.push(result.join(' '));
                }

                findPermutation(k + 1);
                flagArray[i] = false;
            }
        }
    }

    findPermutation(0);

    const keywords = stringArray.reduce((acc, cur) => {
        const words = createKeywords(cur);
        return [...acc, ...words];
    }, []);

    return keywords;
};
export const fetUserByName = (search) => {
    const db = getFirestore();
    const q = query(collection(db, "users"),
        where("keywords", "array-contains", limit(5), search)
    )
    let users = []
    onSnapshot(q, (snapshot) => {
        snapshot.docs.forEach((doc) => {
            users.push({ ...doc.data() })
        })
        window.listUserFetch = users
    })
    return users
}
export const fetUsersByName = (search) => {
    return new Promise((resolve, reject) => {
        const db = getFirestore();
        const q = query(collection(db, "users"),
            where("keywords", "array-contains", search)
        )
        onSnapshot(q, (snapshot) => {
            let users = []
            snapshot.docs.forEach((doc) => {
                users.push({ ...doc.data() })
            })
            resolve(users)
        })
    })
}
export const fetchUserById = (id) => {
    return new Promise((resolve, reject) => {
        const db = getFirestore();
        const q = query(collection(db, "users"),
            where("id", "==", id)
        )
        onSnapshot(q, (snapshot) => {
            let user = null
            snapshot.docs.forEach((doc) => {
                user = { ...doc.data() }
            })
            resolve(user);
        })
    })
};
export const unFriendRequest = async (userId, friendId) => {
    const db = getFirestore();
    const currentUser = doc(db, "users", userId);
    const friend = doc(db, "users", friendId)

    await updateDoc(currentUser, {
        listFriend: arrayRemove(friendId)
    });
    await updateDoc(friend, {
        listFriend: arrayRemove(userId)
    });

}
export const unRequestAddFriend = async (userId, friendId) => {
    const db = getFirestore();
    const friend = doc(db, "users", friendId)

    await updateDoc(friend, {
        listRequest: arrayRemove(userId)
    });
}
export const addFriendRequest = async (userId, friendId) => {
    const db = getFirestore();
    const friend = doc(db, "users", friendId)

    await updateDoc(friend, {
        listRequest: arrayUnion(userId)
    });
}
export const aceeptResquest = async (userId, friendId) => {
    const db = getFirestore();
    const currentUser = doc(db, "users", userId);
    const friend = doc(db, "users", friendId)

    await updateDoc(currentUser, {
        listRequest: arrayRemove(friendId),
        listFriend: arrayUnion(friendId)
    });
    await updateDoc(friend, {
        listFriend: arrayUnion(userId)
    });
}
export const unAcceptRequest = async (userId, friendId) => {
    const db = getFirestore();
    const currentUser = doc(db, "users", userId);

    await updateDoc(currentUser, {
        listRequest: arrayRemove(friendId)
    });
}
export function getTimeElapsed(milliseconds) {
    const seconds = Math.floor((Date.now() - milliseconds) / 1000);

    if (seconds < 60) {
        return `${seconds} seconds ago`;
    } else if (seconds < 60 * 60) {
        const minutes = Math.floor(seconds / 60);
        return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else if (seconds < 60 * 60 * 24) {
        const hours = Math.floor(seconds / (60 * 60));
        return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else {
        const days = Math.floor(seconds / (60 * 60 * 24));
        return `${days} day${days > 1 ? 's' : ''} ago`;
    }
}
//////////////////Chat//////////////
export function fetchAllConversation() {
    return new Promise((resolve, reject) => {
        const db = getFirestore();
        const { id } = getCurrentUserData();
        const q = query(collection(db, "converstations"),
            where("member", 'array-contains', id)
        )
        onSnapshot(q, (snapshot) => {
            let friendId = []
            snapshot.docs.forEach((doc) => {
                const friend = { ...doc.data() }
                friend.push(friend.members.filter(member => member !== id))
            })
            resolve(friendId)
        })
    })
}
export function postMessage(data) {

}
export function fetchConversation(senderId) {
    const db = getFirestore();
    const { id } = getCurrentUserData();
    const q = query(collection(db, "converstations"),
        where("member", 'in', [id, senderId])
    )
    onSnapshot(q, (snapshot) => {
        let users = []
        snapshot.docs.forEach((doc) => {
            users.push({ ...doc.data() })
        })
        resolve(users)
    })
}
export function getCurrentUserData() {
    return JSON.parse(localStorage.getItem("userData")) || null
}