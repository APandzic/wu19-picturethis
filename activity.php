<?php require __DIR__.'/views/header.php'; ?>

<article>
    <h1><?php echo $config['title']; ?></h1>
    <p>This is the activity page.</p>

    <?php if (isset($_SESSION['user'])) : ?>
        <p>Welcome, <?php echo $_SESSION['user']['firstname']; ?>, to the activity page!</p>
    <?php endif; ?>
</article>

<?php require __DIR__.'/views/footer.php'; ?>