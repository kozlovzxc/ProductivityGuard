function getHostname(url)
{
    var parser = document.createElement('a');
    parser.href = url
    return parser.hostname
}
