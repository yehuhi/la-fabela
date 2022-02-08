import database from "../../middleware/firebase/database";
import storageDB from "../../middleware/firebase/storage";

export default {
    getPosts: async ({commit, state, rootState}, option) => {
        let flag = true;
        debugger
        let options = {};
        options.groups = [];
        if (options) {
            for (let key of rootState.users.myGroup) {
                options.groups.push(key.carGroup)
            }
        }
        if (options.groups) {
            options.groups = [];
            let arr = rootState.users.privateUser.UserGroups;
            for (let key in arr) {
                options.groups.push(arr[key].carGroup);
            }
        }
        let myPosts = [];
        let myPostAlone = [];
        let storage = 0;
        for (let i = 0; i < options.groups.length; i++) {
            const posts = await database.get({entity: `posts/${options.groups[i]}`});
            if (posts[0]) {
                let j = 0;
                for (; j < posts.length; j++) {
                    debugger
                    myPosts[storage] = posts[j];
                    storage++;
                }
                if (option !== undefined) {
                    if (option.postId) {
                        for (let myPost of myPosts) {
                            if (option.postId === myPost.id && flag) {
                                myPostAlone.push(myPost);
                                flag = false;
                            }
                        }
                    }
                }
            }
            debugger
            if (i === options.groups.length - 1) {
                if (option !== undefined) {
                    if (option.postId) {
                        commit('setPosts', myPostAlone)
                    } else {
                        commit('setPosts', myPosts)
                    }
                } else {
                    commit('setPosts', myPosts)
                }
            }
            debugger
        }
    },

    insertPosts: ({state, commit, rootState}) => {
        debugger
        const post = {};
        Object.assign(post, state.postim);
        // Saves in DB
        database.generateId({entity: 'Test2'})
            .then(id => {
                storageDB.uploadImg({imageName: id, file: post.image})
                    .then(url => {
                        post.url = url;
                        post.imgName = id;
                        state.sumComment = 0;
                        post.sumComments = state.sumComment;
                        debugger
                        let store = rootState.users.userStore.imStore;
                        let entit = '';
                        let tableName = 'posts';
                        let insertTo = 'insertPost';
                        if (!store) {
                            debugger
                            entit = `posts/${post.carGroup}`;
                            tableName = 'posts';
                        }
                        database.createPost({entity: `${entit}`, post, id: post.imgName})
                            .then(async () => {
                                debugger
                                post.id = id
                                await database.updateUserPost({
                                    entity: 'users',
                                    subEntity: 'PostsId',
                                    post: {[id]: post.id}
                                });
                                commit('resetEditedPost')
                                commit(insertTo, post)
                            })
                    })
            })
    },

    insertCommentsToPost: async ({commit, state, rootState, dispatch}, carGroup) => {
        debugger
        let postComment = {};
        const id = await database.generateId({entity: 'Test2'})

        Object.assign(postComment, state.comment);
        debugger
        await database.updateCommentsPost({
            entity: `posts/${carGroup}`,
            postId: state.editedPostId,
            subEntity: 'PostComments',
            post: {[id]: postComment}
        })
            .then(() => {
                dispatch('getPostComments');
                dispatch('getSumComments');
            })
    },

    insertCommentToComments: async ({commit, state, rootState, dispatch}, options) => {
        // debugger
        let commentToComments = {};
        const id = await database.generateId({entity: 'Test2'})

        Object.assign(commentToComments, state.replyComment);
        commentToComments.comToComId = id;
        // debugger
        await database.updateCommentToComments({
            entity: `posts/${options.carGroup}`,
            postId: state.editedPostId,
            PostComments: 'PostComments',
            CommentId: options.commentId,
            subEntity: 'CommToComm',
            post: {[id]: commentToComments}
        })
            .then(() => {
                dispatch('getPostCommentToComments')
            });
    },

    insertReplyCommentsSum: async ({commit, state, rootState, dispatch}, options) => {
        // debugger
        await database.updateCommentToCommentsPostSum({
            entity: `posts/${options.carGroup}`,
            postId: state.editedPostId,
            subEntity: 'PostComments',
            CommentId: options.commentId,
            subEntity2: 'sumComToCom',
            post: options.sumComToCom
        })
            .then(() => {
                dispatch('getPostComments');
                dispatch('getSumComments');
            })
    },

    insertSumPost: async ({state, commit, rootState, dispatch}, carGroup) => {
        debugger
        state.postim.sumComments += state.sumComment;
        debugger
        await database.updateSumComments({
            entity: `posts/${carGroup}/${state.editedPostId}/sumComments`, post: state.postim.sumComments
        });
        commit('setSumComment', state.postim.sumComments)

        debugger
        // dispatch('getPosts');
    },

    getSumComments: async ({commit, state, rootState, dispatch}) => {
        debugger
        const sumComments = await database.getSumComm({entity: `posts/${state.editedPostCarGroup}/${state.editedPostId}/sumComments`})
        debugger
        commit('setSumComment', sumComments)
        debugger
    },

    getPostComments: async ({commit, state, rootState, dispatch}, options) => {
        debugger
        const comments = await database.get({entity: `posts/${state.editedPostCarGroup}/${state.editedPostId}/PostComments`});
        comments.sum = comments.length;
        debugger
        commit('setPostComments', comments)
        debugger
        debugger
        if (options === undefined || !options.idExist) {
            dispatch('getPosts');
            dispatch('getSumComments');
        }
    },

    removePosts: async ({commit, state, rootState}, options) => {
        debugger
        await database.removePost({entity: `posts/${options.carGroup}/${options.postId}`})
    },

    getPostCommentToComments: async ({commit, state, rootState, dispatch}, options) => {
        debugger
        let comments = '';
        if (options === undefined) {
            debugger
            comments = await database.get(
                {entity: `posts/${state.editedPostCarGroup}/${state.editedPostId}/PostComments/${state.replyComment.commentId}/CommToComm`});
            comments.sum = comments.length;

        } else {
            debugger
            comments = await database.get(
                {entity: `posts/${state.editedPostCarGroup}/${state.editedPostId}/PostComments/${options.commentId}/CommToComm`});
            comments.sum = comments.length;
        }
        debugger
        commit('setPostCommentToComments', comments);

        debugger
        if (options === undefined || !options.idExist) {
            dispatch('getPosts');
            dispatch('getSumComments');
        }
    },

    insertUserPostLike: ({state, commit}) => {
        debugger
        let tableName = 'users';
        database.updateUserItem({
            entity: tableName,
            subEntity: 'postIlikeById',
            item: {[state.editedPostId]: state.editedPostId}
        }).then()
    },

    insertDataById: async ({state, commit, dispatch, rootState}, carGroup) => {
        const post = {};
        const userLikes = [];
        Object.assign(post, state.postim);
        debugger
        let postId = await database.getById({entity: `posts/${carGroup}`, id: state.editedPostId});
        debugger
        let user = rootState.users.usersLikePost[0];
        debugger
        userLikes.push(user);
        debugger
        if (postId.imgName === post.imgName) {
            await database.updatePost({entity: `posts/${carGroup}`, id: state.editedPostId, post: post})
        }
        debugger
        dispatch('getPosts');
    }
}