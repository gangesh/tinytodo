<script>
    import { token } from '$lib/stores';
    import { goto } from '$app/navigation';

    let email = '';
    let password = '';
    let confirmPassword = '';

    async function handleLogin() {

        if (!email || !password || !confirmPassword) {
            alert('Could not create account. Check your credentials and try again.')
            return;
        }

        if (password !== confirmPassword) {
            alert('Passwords do not match. Please try again.')
            return;
        }

        let res = await fetch('/api/users', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        }).then(i => i.json());

        if (!res.token) { 
            alert('Could not create account. Check your credentials and try again.') 
            return;
        }

        token.set(res.token);

        goto('/', {replaceState: true});
    }
</script>

<form on:submit|preventDefault={handleLogin} class="border border-gray-darkest p-3">
    <h1 class="font-bold text-xl">Create Account</h1>
    <input type="text" bind:value={email} placeholder="Email Address" class="block w-64 p-2 border border-gray-darkest my-3">
    <input type="password" bind:value={password} placeholder="Password" class="block w-64 p-2 border border-gray-darkest my-3">
    <input type="password" bind:value={confirmPassword} placeholder="Confirm Password" class="block w-64 p-2 border border-gray-darkest">
    <button type="submit" class="mt-3">Submit</button>
</form>
