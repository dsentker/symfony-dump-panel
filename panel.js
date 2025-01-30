chrome.tabs.query({active: true}, function (tabs) {

    if (!tabs.length) return;

    const currentTab = tabs[0];
    if (!currentTab.url) return;

    const url = new URL(currentTab.url);
    const symfonyProfilerDumpUrl = `${url.origin}/_profiler/latest?type=request&limit=10&panel=dump`;
    const errorPage = `
    <html>
      <head>
        <style>
          body {
            background-color: #121212;
            color: #ffffff;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            font-family: Arial, sans-serif;
          }
        </style>
      </head>
      <body>
        <h2>Symfony project or profiler not found!</h2>
      </body>
    </html>`;

    document.getElementById('reload').addEventListener('click', function() {
        // noinspection SillyAssignmentJS
        document.getElementById('symfonyFrame').src = document.getElementById('symfonyFrame').src;
    });

    fetch(symfonyProfilerDumpUrl, {method: 'HEAD'})
        .then(response => {
            const iframe = document.getElementById('symfonyFrame');
            if (response.ok) {
                iframe.src = symfonyProfilerDumpUrl;
                document.getElementById('reload').style.display = 'inline-block';

            } else {
                iframe.srcdoc = errorPage;
            }
        })
        .catch(function () {
            document.getElementById('symfonyFrame').srcdoc = errorPage;
        });
});