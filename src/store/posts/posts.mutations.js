export default {
    setPosts: ((state, posts) => state.postArray = posts),

    setComment: ((state, comment) => state.comment = comment),

    setReplyComment: ((state, replyComment) => state.replyComment = replyComment),

    setPostBadge: ((state, badges) => state.postBadges.push(badges)),

    setSumComment: ((state, sumComment) => {
        debugger
        state.sumComment = sumComment
    }),

    setMyPosts: ((state, posts) => state.myPosts = posts),

    setPostComments: ((state, postComments) => {
        debugger
        state.postComments = postComments
    }),

    setPostComments2: ((state, postCommentsSum) => {
        debugger
        state.postComments.sumReplyComm = postCommentsSum
    }),

    setPostCommentToComments: ((state, postCommentToComments) => {
        debugger
        state.postCommentToComments = postCommentToComments
    }),

    resetPostComments: ((state) => state.postComments = []),

    resetPosts: ((state) => {
        debugger
        state.postArray = ''
    }),

    setEditedPostId: ((state, id) => state.editedPostId = id),

    setEditedPostCarGroup: ((state, carGroup) => state.editedPostCarGroup = carGroup),

    setEditedPost: ((state, post) => {
        debugger
        console.log(post)
        state.postim = post
    }),

    resetEditedPostId: ((state) => state.editedPostId = ''),

    resetEditedPost: ((state) => {
        for (const key in state.postim) {
            state.postim[key] = ''
        }
        delete state.editedPost.id;
    }),
    editedPost: ((state, post) => {
        const index = state.postArray.findIndex(p => p.id === post.id)
        state.postArray.splice(index, 1, post)
    }),

    deletePost: ((state, postId) => {
        const post = state.myPosts.findIndex(p => p.id === postId)
        state.myPosts.splice(index, 1)
    }),

    insertPost: ((state, post) => {
        state.postArray.push(post)
    }),

    // *********** My posts in the Profile *************
    insertMyPost: ((state, post) => {
        state.posts.push(post)
    }),
}