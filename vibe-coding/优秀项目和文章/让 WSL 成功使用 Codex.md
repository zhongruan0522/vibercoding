# Vibe Coding - 优秀文章&项目部分

## 优秀文章&项目

### 让 WSL 成功使用 Codex

[点击访问原帖](https://linux.do/t/topic/1002178)

#### **1. 在 WSL 中设置网络代理**

Codex 的请求需要能访问外网。如果你在 Windows 上运行了 v2ray（假设监听端口为 10809），则需要在 WSL 中让请求走这个代理。

##### **（1）确认 Windows 主机地址**

在 WSL 中运行：

```bash
cat /etc/resolv.conf
```

通常能看到类似：

```bash
nameserver 172.28.192.1
```

这里的 `172.28.192.1` 就是 Windows 宿主机在 WSL 网络中的地址。 （每次重启 WSL 可能会变，需重新查看。）

##### **（2）设置代理环境变量**

在 WSL 的`~/.bashrc` 或`~/.zshrc`中加入：

```bash
export http_proxy="http://172.28.192.1:10809"
export https_proxy="http://172.28.192.1:10809"
export all_proxy="socks5://172.28.192.1:10808"
```

然后刷新配置：

```bash
source ~/.bashrc
注：10809 是 http 代理端口，10808 是 socks 代理端口，需与 Windows v2ray 的实际端口保持一致。
```

##### **（3）测试代理是否生效**

```bash
curl -I https://www.google.com
```

#### **2. 完成 Codex 登录认证**

Codex CLI 在首次运行时会尝试唤起浏览器进行 OAuth 登录。但 WSL 无法直接打开 Windows 浏览器，所以需要在 Windows 端完成登录。

##### **（1）在 Windows 中完成 Codex 登录**

在 Windows Terminal/PowerShell/CMD 中运行 `codex` ，然后选择通过登录的方式使用。

登录成功后，会在 Windows 用户目录下生成认证文件：

```bash
C:\Users\<你的用户名>\.codex\auth.json
```

##### **（2）复制认证文件到 WSL**

进入 Windows 的 .codex 目录，找到 auth.json，然后复制到 WSL。

```bash
cp /mnt/c/Users/<你的用户名>/.codex/auth.json ~/.codex/
```

##### **（3**）**使用`codex`**

此时应该就可以使用codex了 如果有问题，主要可能是这两方面：

1. 网络问题，是否真的走了代理
2. 登录验证的文件是否有效，一段时间后可能会过期，再重复登录操作一次即可



### 补充方法（一种更适合小白的方法）

来自[佬友FunctorFish](https://linux.do/u/functorfish)

事实上，在wsl中使用codex并不需要如此麻烦，这里介绍一种更简单无脑的方法：

- **让代理软件开启tun mode即可**
 
tun 模式下代理软件从网络层接管了所有出站流量的取向，而wsl本质是宿主机下的一个linux子系统自然也被接管了，所以步骤很简单，把wsl当成一个linux系统按照 之前的教程进行如下操作即可：

1. **安装nodejs和npm，安装git bash**
2. **通过npm 安装codex**
3. **在bash中输入codex login，打开浏览器登录回调地址**
4. **登录成功后即可使用**

实际上是可以正确回调更新wsl下的凭证的，不需要第一种如此繁琐的过程。

just enjoy it

示意图：
![image-20251110131919](\assets\image-20251110131919.png)