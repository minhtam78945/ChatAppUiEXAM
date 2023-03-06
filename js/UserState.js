class UserState {
    constructor() {
        this.displayName = null
        this.email = null
        this.uid = null;
        this.photoURL = null;
    }
    setDisplayName(displayName) {
        this.displayName = displayName;
    }
    setEmail(email) {
        this.email = email
    }
    setUid(uid) {
        this.uid = uid
    }
    setPhotoURL(photoURL) {
        this.photoURL = photoURL
    }
}