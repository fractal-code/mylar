Package.describe({
    summary: "Standard Mylar packages",
    name: "mylar:platform",
    version: "0.2.2",
    git: "https://github.com/gliesesoftware/mylar.git"
});

Package.onUse(function (api) {
    api.imply([
        // principal graph
        'mylar:principal@0.2.0',
        // login service for IDP accounts
        'mylar:accounts-idp@0.2.0',
        // meteor changes
        'mylar:meteor-changes@0.2.3'
    ]);
});