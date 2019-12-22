<?php require __DIR__.'/views/header.php'; ?>

<article>
    <h1>Create Account</h1>

    <form action="app/users/create.php" method="post">
        <div class="form-group">
            <label for="firstname">First Name</label>
            <input class="form-control" type="firstname" name="firstname" required>
            <small class="form-text text-muted">Please provide the your name.</small>
        </div><!-- /form-group -->

        <div class="form-group">
            <label for="lastname">Last Name</label>
            <input class="form-control" type="lastname" name="lastname" required>
            <small class="form-text text-muted">Please provide the your name.</small>
        </div><!-- /form-group -->

        <div class="form-group">
            <label for="username">Username</label>
            <input class="form-control" type="username" name="username" required>
            <small class="form-text text-muted">Please provide the your username.</small>
        </div><!-- /form-group -->

        <div class="form-group">
            <label for="bio">Bio</label>
            <input class="form-control" type="bio" name="bio">
            <small class="form-text text-muted">Please provide the your username.</small>
        </div><!-- /form-group -->

        <div class="form-group">
            <label for="email">Email</label>
            <input class="form-control" type="email" name="email" required>
            <small class="form-text text-muted">Please provide the your email address.</small>
        </div><!-- /form-group -->

        <div class="form-group">
            <label for="password">Password</label>
            <input class="form-control" type="password" name="password" required>
            <small class="form-text text-muted">Please provide the your password.</small>
        </div><!-- /form-group -->

        <button type="submit" class="btn btn-primary">Create and Login</button>
    </form>
</article>

<?php require __DIR__.'/views/footer.php'; ?>