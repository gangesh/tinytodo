<script>
    import { token } from '$lib/stores';
    import { goto } from '$app/navigation';

    let email = '';
    let password = '';

    async function handleLogin() {

        if (!email || !password) {
            alert('Could not log in. Check your credentials and try again.')
            return;
        }

        let res = await fetch('/api/users', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        }).then(i => i.json());

        if (!res.token) { 
            alert('Could not log in. Check your credentials and try again.') 
            return;
        }

        token.set(res.token);

        goto('/', {replaceState: true});
    }
</script>

<form on:submit|preventDefault={handleLogin} class="border border-gray-darkest p-3">
    <h1 class="font-bold text-xl">Account Login</h1>
    <input type="text" bind:value={email} placeholder="Email Address" class="block w-64 p-2 border border-gray-darkest my-3">
    <input type="password" bind:value={password} placeholder="Password" class="block w-64 p-2 border border-gray-darkest">
    <button type="submit" class="mt-3">Submit</button><br><br>
    <small><a href="/new-account">I don't have an account</a></small> | 
    <small><a href="/forgot">Forgot Password</a></small>
</form>
