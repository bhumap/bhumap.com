
function isDev() {
    return process.env.NEXT_PUBLIC_NODE_ENV === 'development';
}

export { isDev };