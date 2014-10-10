Package.describe({
    summary: "Standard Mylar packages",
    name: "mylar:platform",
    version: "0.0.1",
    git: "https://github.com/gliesesoftware/mylar.git"
});

Package.onUse(function (api) {
    api.imply([
        // principal graph
        'mylar:principal',
        // login service for IDP accounts
        'mylar:accounts-idp',
        // meteor changes
        'mylar:meteor-changes'
    ]);
});