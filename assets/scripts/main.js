'use strict';

const footerDiv = document.querySelector('.footer-icons');
const footerATags = footerDiv.querySelectorAll('a');
footerATags.forEach(element => {
    if(element.pathname===window.location.pathname && element.pathname !== '/home.php') {
        const pathnameArray=element.pathname.split('.');
        const pathname = pathnameArray[0].split('/');
        const iconImg = "<img class='footer-img' src='/../assets/icons" + pathnameArray[0] + "_active.svg' class='" + pathname[1] + "-active'>";
        element.innerHTML = iconImg; 
    }
    if (element.pathname===window.location.pathname && window.location.pathname === '/home.php') {
        const img = element.querySelector('img');
        img.classList.add('home-active');
    } else if (window.location.pathname !== '/home.php') {
        const img = element.querySelector('img');
        img.classList.remove('home-active');
    }
});

const followUser = () => {
    const followDiv = document.querySelector(".follow-div");
    const followers = document.querySelector(".numFollowers");
    const numFollowers = parseInt(followers.innerHTML);
    followers.innerHTML = numFollowers+1;

    const elementWithID = document.querySelector(".username");
    const followedUserID = elementWithID.id;
    followDiv.innerHTML = `<h6 class="following">Following</h6>
    <button class="follow-buttons unfollow-button" onclick="unfollowUser()">Unfollow</button>`;

    const followForm = document.createElement('form');
    followForm.method = "post";
    followForm.innerHTML = `<input type="hidden" name="followed-user-id" value="${followedUserID}">`;
    const followFormData = new FormData(followForm);
    fetch("app/users/follow.php", {
    method: 'POST',
    body: followFormData
    });
} 

const unfollowUser = () => {
    const followDiv = document.querySelector(".follow-div");
    const followers = document.querySelector(".numFollowers");
    const numFollowers = parseInt(followers.innerHTML);
    followers.innerHTML = numFollowers-1;
    
    const elementWithID = document.querySelector(".username");
    const unfollowedUserID = elementWithID.id;
    followDiv.innerHTML = `<button class="follow-buttons" onclick="followUser()">Follow</button>`;

    const unfollowForm = document.createElement('form');
    unfollowForm.method = "post";
    unfollowForm.innerHTML = `<input type="hidden" name="unfollowed-user-id" value="${unfollowedUserID}">`;
    const unfollowFormData = new FormData(unfollowForm);
    fetch("app/users/unfollow.php", {
    method: 'POST',
    body: unfollowFormData
    });
};

function wait(ms){
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms) {
      end = new Date().getTime();
   }
 }

// Enter a comment
const commentImgs = document.querySelectorAll(".comment-img");
commentImgs.forEach(commentImg => {
    const ID = commentImg.id;
    commentImg.addEventListener('click', event => {
        const commentsDiv = document.querySelector(`.comments-container-${ID}`);
        const usernameElement = document.querySelector('.dummy-div');
        const username = usernameElement.innerHTML;
        event.preventDefault();
        const div = document.createElement('div');
        div.classList.add("comment-box");
        const h5 = document.createElement('h5');
        h5.classList.add("comment-user");
        h5.innerHTML = username;
        div.appendChild(h5);
        const editForm = document.createElement('form');
        editForm.classList.add("edit-post-form");
        editForm.method = "post";
        editForm.innerHTML = `<input type="hidden" name="post-id" value="${ID}">
        <input id="updateField" type="text" name="comment-text">
        <button class="edit-comment-button" type="submit">Post</button>`;
        div.appendChild(editForm);
        commentsDiv.appendChild(div);
        updateField.focus();

        editForm.addEventListener('submit', event => {
            event.preventDefault();
            const formData = new FormData(editForm);
            fetch('/app/posts/comment.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(comment => {
                div.innerHTML = "";
                if(comment.commentText!=="") {
                    const h5 = document.createElement('h5');
                    h5.classList.add("comment-user");
                    h5.innerHTML = username;
                    div.appendChild(h5);
                    const h6 = document.createElement('h6');
                    h6.classList.add(`comment-${ID}`);
                    h6.innerHTML = comment.commentText;
                    div.appendChild(h6);
                };
            });
        });
    }); 
});

// Like a post
let likeIMGs = document.querySelectorAll(".like-img");
likeIMGs.forEach(likeIMG => {
    const ID = likeIMG.id;
    likeIMG.addEventListener('click', event => {
        event.preventDefault();
        const postIdDiv = document.querySelector('.dummy-post-div');
        const postID = postIdDiv.innerHTML;
        let liked = true;
        if(likeIMG.src.includes("/assets/icons/like_inactive.svg")) {
            likeIMG.src='/assets/icons/like_active.png';
        } else {
            likeIMG.src='/assets/icons/like_inactive.svg';
            liked = false;
        }
        const likeForm = document.createElement('form');
        likeForm.method = "post";
        likeForm.innerHTML = `<input type="hidden" name="post-id" value="${ID}">
        <input type="hidden" name="liked-user-id" value="${postID}">`;
        if (liked) {
            const likeFormData = new FormData(likeForm);
            fetch("app/posts/like.php", {
            method: 'POST',
            body: likeFormData
            });
        } else {
            const removeLikeFormData = new FormData(likeForm);
            fetch("app/posts/removeLike.php", {
            method: 'POST',
            body: removeLikeFormData
            });
        };  
    });
});


